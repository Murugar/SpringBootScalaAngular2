package com.iqmsoft.domain

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence._
import scala.beans.BeanProperty
import java.util._

@Entity
class PollChoice {
  
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @BeanProperty
    var id: java.lang.Long = _
    @BeanProperty
    var choice: java.lang.String = _

    @JsonIgnore //don't export this one, or it will become an infiteloop
    @ManyToOne
    @JoinColumn(name = "poll_id")
    @BeanProperty
    var poll: Poll = _

    @JsonIgnore
    @OneToMany(mappedBy = "pollChoice" , cascade = Array(CascadeType.ALL))
    @BeanProperty
    var answers :Set[PollAnswer] = _
  
}