package com.iqmsoft.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import javax.validation.Valid
import javax.inject.Inject
import com.iqmsoft.service._
import com.iqmsoft.domain._

import com.iqmsoft.dto._
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate

import org.springframework.messaging.Message
import org.springframework.messaging.MessageHeaders

import org.springframework.messaging.MessageChannel

import com.iqmsoft.exception.BadRequestException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation._
import java.util._
import org.springframework.messaging.handler.annotation.Payload
import scala.collection.JavaConversions._


@RestController
@RequestMapping(value = Array("/api"))
class PollController @Autowired() (template: SimpMessagingTemplate, pollService: PollService) {

  val logger = LoggerFactory.getLogger(classOf[PollController])
  
  var mc : MessageChannel = _
  
  @RequestMapping(value = Array("/poll"), method = Array(RequestMethod.GET))
  def getPolls() : List[Poll] = {
       var a : List[Poll]   = pollService.findAll()
       
       return a
  }

  @RequestMapping(value = Array("/poll/{id}"), method = Array(RequestMethod.GET))
  @ResponseStatus(HttpStatus.OK)
  def getPoll(@PathVariable id: Long) = pollService.findById(id)

  @RequestMapping(value = Array("/poll/stats"), method = Array(RequestMethod.GET))
  def getPollStats(): ArrayList[PollStats] = {
    var stats: ArrayList[PollStats] = pollService.getPollStats();
    return stats
  }

  @MessageMapping(Array("/selectPoll"))
  @SendTo(Array("/queue/selectPoll"))
  def getPollList(@Payload poll: Poll): Poll = {
    return poll
  }

  @MessageMapping(Array("/selectChoice"))
  @SendTo(Array("/queue/selectChoice"))
  def selectPollChoice(@Payload pollChoice: PollChoice): PollChoice = {
    return pollChoice
  }

  @RequestMapping(value = Array("/poll/{id:[\\d]+}/submit"), method = Array(RequestMethod.POST))
  def submitPoll(@PathVariable id: Long, @RequestBody choice: PollChoice) {
    var poll: Poll = pollService.findById(id);
    var answer: PollAnswer = new PollAnswer()
    var auth: Authentication = SecurityContextHolder.getContext().getAuthentication()

    answer.user = auth.getName
    answer.pollChoice = choice
    pollService.savePollAnswer(answer)

    //refresh the data in the Dashboard
    var stats: ArrayList[PollStats] = pollService.getPollStats();
    
    var headers: Map[String, Object]  = new HashMap[String, Object]()
    
    headers.put("name", auth.getName)
    
   // template.setSendTimeout(1000)
    
    template.convertAndSend("/queue/answerSubmitted", stats, headers);
    mc = template.getMessageChannel()
   
    logger.info("Post Poll")
    
    logger.info(mc.toString())
    
    logger.info(template.getMessageConverter().toString())
    
   
   
  }

}
