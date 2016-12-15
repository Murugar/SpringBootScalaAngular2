package com.iqmsoft.scala.test

import com.fasterxml.jackson.databind.ObjectMapper
import com.iqmsoft.SpringBootConfig
import com.iqmsoft.domain.Account
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext;
import javax.persistence.Entity
import org.junit.runners.MethodSorters

@RunWith(classOf[SpringJUnit4ClassRunner])
@SpringApplicationConfiguration(Array(classOf[SpringBootConfig]))
@WebAppConfiguration
@FixMethodOrder(MethodSorters.JVM)
class AccountTest {

  var objectMapper: ObjectMapper = _

  var mockMvc: MockMvc = _

  @Autowired
  var wac: WebApplicationContext = _

  @Before
  def before = {
    objectMapper = new ObjectMapper
    mockMvc = MockMvcBuilders.webAppContextSetup(wac).build
  }

  @Test
  def accountsTest: Unit = mockMvc.perform(get("/api/accounts")).andDo(print()).andExpect(status.isOk)

  @Test
  def accountTest: Unit =
    mockMvc.perform(get("/api/account/1"))
      .andDo(print())
      .andExpect(status.isOk)
      .andExpect(jsonPath("$.name", is("wonwoo")))
      .andExpect(jsonPath("$.password", is("pw123000")))

  @Test
  def creatTest: Unit = {
    val account = new Account
    account.setName("create")
    account.setPassword("create123")

    mockMvc.perform(post("/api/account")
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(account)))
      .andExpect(status.isCreated)
      .andDo(print())
  }

  @Test
  def updateTest: Unit = {
    val account = new Account
    account.setName("test1")
    mockMvc.perform(patch("/api/account/3")
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(account)))
      .andDo(print())
      .andExpect(status.isOk)
      .andExpect(jsonPath("$.name", is("test1")))
      .andExpect(jsonPath("$.password", is("Pjgn1i93")))
  }

  //@Test
  def deleteTest: Unit =
    mockMvc.perform(delete("/api/account/2").contentType(MediaType.APPLICATION_JSON))
      .andDo(print())
      .andExpect(status.isNoContent)


  @Test
  def accountNotFoundExceptionTest: Unit = mockMvc.perform(get("/api/account/100000000")).andDo(print()).andExpect(status.isBadRequest)

  @Test
  def accountBadRequestExceptionTest: Unit = {
    val account = new Account
    account.setName("wl")
    mockMvc.perform(post("/api/account").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(account)))
      .andDo(print())
      .andExpect(status.isBadRequest)
  }
}
