package com.iqmsoft.scala.test;

import static org.junit.Assert.*;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iqmsoft.config.WebSocketConfig;
import com.iqmsoft.controller.PollController;
import com.iqmsoft.domain.Poll;
import com.iqmsoft.domain.PollChoice;
import com.iqmsoft.repository.PollAnswerRepository;
import com.iqmsoft.repository.PollRepository;
import com.iqmsoft.service.PollService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.support.StaticApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.annotation.support.SimpAnnotationMethodMessageHandler;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.AbstractSubscribableChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.util.JsonPathExpectationsHelper;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;


import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManager;



@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
		WebSocketConfig.class,
		WSControllerTests.TestConfig.class
})
//@ComponentScan("com.iqmsoft") 
@Configuration
@EnableTransactionManagement
@EnableAutoConfiguration
@PropertySource("classpath:application.properties")
@EnableJpaRepositories("com.iqmsoft.repository")
@EntityScan("com.iqmsoft.domain")
public class WSControllerTests {

	
	static class Trade {

		private String ticker;

		private int shares;

		private TradeAction action;

		private String username;


		public String getTicker() {
			return this.ticker;
		}

		public void setTicker(String ticker) {
			this.ticker = ticker;
		}

		public int getShares() {
			return this.shares;
		}

		public void setShares(int shares) {
			this.shares = shares;
		}

		public TradeAction getAction() {
			return this.action;
		}

		public void setAction(TradeAction action) {
			this.action = action;
		}

		public String getUsername() {
			return this.username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		@Override
		public String toString() {
			return "[ticker=" + this.ticker + ", shares=" + this.shares
					+ ", action=" + this.action + ", username=" + this.username + "]";
		}


		public enum TradeAction {
			Buy, Sell;
		}

	}
	
	
	class TestChannelInterceptor extends ChannelInterceptorAdapter {

		private final BlockingQueue<Message<?>> messages = new ArrayBlockingQueue<>(100);

		private final List<String> destinationPatterns = new ArrayList<>();

		private final PathMatcher matcher = new AntPathMatcher();


		public void setIncludedDestinations(String... patterns) {
			this.destinationPatterns.addAll(Arrays.asList(patterns));
		}

		/**
		 * @return the next received message or {@code null} if the specified time elapses
		 */
		public Message<?> awaitMessage(long timeoutInSeconds) throws InterruptedException {
			return this.messages.poll(timeoutInSeconds, TimeUnit.SECONDS);
		}

		@Override
		public Message<?> preSend(Message<?> message, MessageChannel channel) {
			if (this.destinationPatterns.isEmpty()) {
				this.messages.add(message);
			}
			else {
				StompHeaderAccessor headers = StompHeaderAccessor.wrap(message);
				if (headers.getDestination() != null) {
					for (String pattern : this.destinationPatterns) {
						if (this.matcher.match(pattern, headers.getDestination())) {
							this.messages.add(message);
							break;
						}
					}
				}
			}
			return message;
		}

	}

	 class TestPrincipal  implements Principal {

			private final String name;


			public TestPrincipal(String name) {
				this.name = name;
			}

			@Override
			public String getName() {
				return this.name;
			}

		}
	
	 
	 private static class TestAnnotationMethodHandler extends SimpAnnotationMethodMessageHandler {

			public TestAnnotationMethodHandler(SubscribableChannel inChannel, MessageChannel outChannel,
					SimpMessageSendingOperations brokerTemplate) {

				super(inChannel, outChannel, brokerTemplate);
			}

			public void registerHandler(Object handler) {
				super.detectHandlerMethods(handler);
			}
		} 
	 
	private PollService pollservice; 
	
	@Autowired private PollRepository pollrepos; 
	
	@Autowired private PollAnswerRepository  pollanswer;
	
	@Autowired private EntityManager emanager;
	 
	@Autowired private AbstractSubscribableChannel clientInboundChannel;

	@Autowired private AbstractSubscribableChannel clientOutboundChannel;

	@Autowired private AbstractSubscribableChannel brokerChannel;

	private TestChannelInterceptor clientOutboundChannelInterceptor;

	private TestChannelInterceptor brokerChannelInterceptor;

	private TestAnnotationMethodHandler annotationMethodHandler;
	
	class TestMessageChannel extends AbstractSubscribableChannel {

		private final List<Message<?>> messages = new ArrayList<>();


		public List<Message<?>> getMessages() {
			return this.messages;
		}

		@Override
		protected boolean sendInternal(Message<?> message, long timeout) {
			this.messages.add(message);
			return true;
		}

	}

	@Before
	public void setUp() throws Exception {

		
		this.pollservice = new PollService();
		
		this.pollservice.setPollRepository(this.pollrepos);
		this.pollservice.setPollAnswerRepository(this.pollanswer);
		
		this.pollservice.setEntityManager(this.emanager);
		
		
		PollController controller = new PollController
				(new SimpMessagingTemplate(new TestMessageChannel()), this.pollservice);
		
		this.brokerChannelInterceptor = new TestChannelInterceptor();
		this.clientOutboundChannelInterceptor = new TestChannelInterceptor();

		this.brokerChannel.addInterceptor(this.brokerChannelInterceptor);
		this.clientOutboundChannel.addInterceptor(this.clientOutboundChannelInterceptor);
		
		
		
		this.annotationMethodHandler = new TestAnnotationMethodHandler(
				new TestMessageChannel(), clientOutboundChannel, new SimpMessagingTemplate(new TestMessageChannel()));
	     
		this.annotationMethodHandler.registerHandler(controller);
		this.annotationMethodHandler.setDestinationPrefixes(Arrays.asList("/websocket"));
		this.annotationMethodHandler.setMessageConverter(new MappingJackson2MessageConverter());
		this.annotationMethodHandler.setApplicationContext(new StaticApplicationContext());
		this.annotationMethodHandler.afterPropertiesSet();
	
	}


//	@Test
	public void getPositions() throws Exception {

		StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.SUBSCRIBE
				);
		headers.setSubscriptionId("0");
		headers.setDestination("/websocket/selectPoll");
		headers.setSessionId("0");
		headers.setUser(new TestPrincipal("admin"));
		headers.setSessionAttributes(new HashMap<String, Object>());
		Message<byte[]> message = MessageBuilder.createMessage(new byte[0], headers.getMessageHeaders());

		this.clientOutboundChannelInterceptor.setIncludedDestinations("/queue/selectPoll");
		this.clientInboundChannel.send(message);

		Message<?> reply = this.clientOutboundChannelInterceptor.awaitMessage(10);
	//	assertNotNull(reply);

	//	StompHeaderAccessor replyHeaders = StompHeaderAccessor.wrap(reply);
		//assertEquals("0", replyHeaders.getSessionId());
		//assertEquals("0", replyHeaders.getSubscriptionId());
	//	assertEquals("/websocket/selectChoice", replyHeaders.getDestination());

	//	String json = new String((byte[]) reply.getPayload(), Charset.forName("UTF-8"));
	//	new JsonPathExpectationsHelper("$[0].company").assertValue(json, "Citrix Systems, Inc.");
	//	new JsonPathExpectationsHelper("$[1].company").assertValue(json, "Dell Inc.");
	//	new JsonPathExpectationsHelper("$[2].company").assertValue(json, "Microsoft");
	//	new JsonPathExpectationsHelper("$[3].company").assertValue(json, "Oracle");
	}

	@Test
	public void executeTrade() throws Exception {

		//Trade trade = new Trade();
		//trade.setAction(Trade.TradeAction.Buy);
		//trade.setTicker("DELL");
		//trade.setShares(25);
		
	     PollChoice trade = new PollChoice();
	     trade.setId(1L);
	     trade.setChoice("Metallica");
		

		byte[] payload = new ObjectMapper().writeValueAsBytes(trade);

		StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.SEND);
		headers.setDestination("/websocket/selectChoice");
		headers.setSessionId("0");
		headers.setUser(new TestPrincipal("admin"));
		headers.setSessionAttributes(new HashMap<String, Object>());
		//Message<byte[]> message = MessageBuilder.createMessage(payload, headers.getMessageHeaders());

		Message<byte[]> message = MessageBuilder.withPayload(payload).setHeaders(headers).build();

		this.annotationMethodHandler.handleMessage(message);

		assertEquals(3, this.pollrepos.findAll().size());
		
		assertEquals(3, this.pollservice.getPollStats().size());
		
		
		//this.brokerChannelInterceptor.setIncludedDestinations("/queue/selectChoice");
		//this.clientInboundChannel.send(message);

		//Message<?> positionUpdate = this.brokerChannelInterceptor.awaitMessage(10);
	//	assertNotNull(positionUpdate);

		//StompHeaderAccessor positionUpdateHeaders = StompHeaderAccessor.wrap(positionUpdate);
	//	assertEquals("/user/fabrice/queue/position-updates", positionUpdateHeaders.getDestination());

	//	String json = new String((byte[]) positionUpdate.getPayload(), Charset.forName("UTF-8"));
		//new JsonPathExpectationsHelper("$.ticker").assertValue(json, "DELL");
		//new JsonPathExpectationsHelper("$.shares").assertValue(json, 75);
	}

	@Configuration
	@EnableScheduling
	@ComponentScan(
			basePackages="org.springframework.samples",
			excludeFilters = @ComponentScan.Filter(type= FilterType.ANNOTATION, value = Configuration.class)
	)
	@EnableWebSocketMessageBroker
	static class TestWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

		@Autowired
		Environment env;

		@Override
		public void registerStompEndpoints(StompEndpointRegistry registry) {
			registry.addEndpoint("/portfolio").withSockJS();
		}

		@Override
		public void configureMessageBroker(MessageBrokerRegistry registry) {
			//registry.enableSimpleBroker("/queue/", "/topic/");
			registry.enableStompBrokerRelay("/queue/", "/topic/");
			registry.setApplicationDestinationPrefixes("/app");
		}
	}

	
	@Configuration
	@SuppressWarnings("MismatchedQueryAndUpdateOfCollection")
	static class TestConfig implements ApplicationListener<ContextRefreshedEvent> {

		@Autowired
		private List<SubscribableChannel> channels;

		@Autowired
		private List<MessageHandler> handlers;


		@Override
		public void onApplicationEvent(ContextRefreshedEvent event) {
			for (MessageHandler handler : handlers) {
				if (handler instanceof SimpAnnotationMethodMessageHandler) {
					continue;
				}
				for (SubscribableChannel channel :channels) {
					channel.unsubscribe(handler);
				}
			}
		}
	}
}