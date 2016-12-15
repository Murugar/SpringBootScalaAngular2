package com.iqmsoft.scala.test

import com.fasterxml.jackson.databind.ObjectMapper
import com.iqmsoft.SpringBootConfig
import com.iqmsoft.domain._

import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.Authentication
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.hamcrest.Matchers._
import org.junit.runner.RunWith
import org.junit.{Before, FixMethodOrder, Test}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationConfiguration
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders._
import org.springframework.test.web.servlet.result.MockMvcResultHandlers._
import org.springframework.test.web.servlet.result.MockMvcResultMatchers._
import org.springframework.test.web.servlet.setup._
import org.springframework.web.context.WebApplicationContext;
import javax.persistence.Entity
import org.junit.runners.MethodSorters
import org.springframework.security.test.web.servlet.setup._
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers._
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders._
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors._
import org.springframework.security.web.FilterChainProxy
import scala.collection.JavaConversions._
import org.springframework.security.test.context.support.WithMockUser
import javax.servlet.Filter

@RunWith(classOf[SpringJUnit4ClassRunner])
@SpringApplicationConfiguration(Array(classOf[SpringBootConfig]))
@WebAppConfiguration
@FixMethodOrder(MethodSorters.JVM)
class PollTest {

  var objectMapper: ObjectMapper = _

  var mockMvc: MockMvc = _
  
  @Autowired
  var wac: WebApplicationContext = _

  @Before
  def before = {
    objectMapper = new ObjectMapper
    
    var s : DefaultMockMvcBuilder = MockMvcBuilders.webAppContextSetup(wac)
    
    var p = s.apply(springSecurity()).asInstanceOf[DefaultMockMvcBuilder]
    
    mockMvc = p.build()
    
  }

  @Test
  @WithMockUser(username = "admin", password = "admin")
  def getMessagePoll: Unit = 
  {
    
    val pc = new Poll
    pc.id = 1
    pc.name = "What is the best Rock band ?"
    
    mockMvc.perform(get("/websocket/selectPoll")
     .contentType(MediaType.APPLICATION_JSON)
     .content(objectMapper.writeValueAsString(pc)))
    .andExpect(status.is4xxClientError())
  }
    
  @Test
  @WithMockUser(username = "admin", password = "admin")
  def getMessagePollChoice: Unit = 
  {
    
    val pc = new PollChoice
    pc.id = 1
    pc.choice = "Metallica"
    
    mockMvc.perform(post("/websocket/selectChoice")
    .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(pc))
    ).andExpect(status.is4xxClientError())  
  }
  
  @Test
  @WithMockUser(username = "admin", password = "admin")
  def pollsTest: Unit = 
 
   
    
    mockMvc.perform(get("/api/poll")
        
    )
    .andDo(print()).andExpect(status.isOk)

  @Test
  @WithMockUser(username = "admin", password = "admin")
  def pollsStats: Unit = mockMvc.perform(get("/api/poll/stats")).andDo(print()).andExpect(status.isOk)

  @Test
  @WithMockUser(username = "admin", password = "admin")
  def poll: Unit = mockMvc.perform(get("/api/poll/1")).andDo(print()).andExpect(status.isOk)
  
  @Test
  @WithMockUser(username = "admin", password = "admin")
  def postTest: Unit = {
    val pc = new PollChoice
    pc.id = 1
    pc.choice = "Metallica"
    mockMvc.perform(post("/api/poll/1/submit")
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(pc)))
      .andExpect(status.isOk)
     
  }
  
  
  
}