package com.iqmsoft.domain



import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence._
import scala.beans.BeanProperty
import java.util._

@Entity
class PollAnswer {
  
    @Id
    @GeneratedValue
    @BeanProperty
    var id : Long = _
    @BeanProperty
    var user : java.lang.String = _

    @ManyToOne
    @JoinColumn(name = "poll_choice_id")
    @BeanProperty
    var pollChoice : PollChoice = _
  
  
}