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
		WebSocketConfig.class
})
@Configuration
@EnableTransactionManagement
@EnableAutoConfiguration
@PropertySource("classpath:application.properties")
@EnableJpaRepositories("com.iqmsoft.repository")
@EntityScan("com.iqmsoft.domain")
public class PollMsgTest {

	
		
	

	 private class TestPrincipal  implements Principal {

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

	private  TestMessageChannel clientOutboundChannel;

	private TestAnnotationMethodHandler annotationMethodHandler;
	
	private static class TestMessageChannel extends AbstractSubscribableChannel {

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
		
		
		this.clientOutboundChannel = new TestMessageChannel();
		
		this.annotationMethodHandler = new TestAnnotationMethodHandler(
				new TestMessageChannel(), clientOutboundChannel, new SimpMessagingTemplate(new TestMessageChannel()));
	     
		
		
		this.annotationMethodHandler.registerHandler(controller);
		this.annotationMethodHandler.setDestinationPrefixes(Arrays.asList("/websocket", "queue"));
		this.annotationMethodHandler.setMessageConverter(new MappingJackson2MessageConverter());
		this.annotationMethodHandler.setApplicationContext(new StaticApplicationContext());
		this.annotationMethodHandler.afterPropertiesSet();
	
	}


	

	@Test
	public void executeChoice() throws Exception {

		
		
	     PollChoice trade = new PollChoice();
	     trade.setId(1L);
	     trade.setChoice("Metallica");
		

		byte[] payload = new ObjectMapper().writeValueAsBytes(trade);

		StompHeaderAccessor headers = StompHeaderAccessor.create(StompCommand.SEND);
		headers.setDestination("/websocket/selectChoice");
		headers.setSessionId("0");
		//headers.setUser(new TestPrincipal("admin"));
		headers.setSessionAttributes(new HashMap<String, Object>());
		
		Message<byte[]> message = MessageBuilder.withPayload(payload).setHeaders(headers).build();

		this.annotationMethodHandler.handleMessage(message);
		
		this.clientOutboundChannel.sendInternal(message, 1000);
		
		assertEquals(1, this.clientOutboundChannel.getMessages().size());
		
		Message<?> reply = this.clientOutboundChannel.getMessages().get(0);

		StompHeaderAccessor replyHeaders = StompHeaderAccessor.wrap(reply);
		assertEquals("0", replyHeaders.getSessionId());
		
		assertEquals("/websocket/selectChoice", replyHeaders.getDestination());

		//assertEquals(3, this.pollrepos.findAll().size());
		
	//	assertEquals(3, this.pollservice.getPollStats().size());
		
		
	
	}

	
	
}