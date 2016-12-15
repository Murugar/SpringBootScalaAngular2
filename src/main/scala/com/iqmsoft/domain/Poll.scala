package com.iqmsoft.domain

import javax.persistence._
import scala.beans.BeanProperty
import java.util._


@Entity
class Poll {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @BeanProperty
    var id: java.lang.Long = _
    @BeanProperty
    var name: java.lang.String = _

    @BeanProperty
    @OneToMany(mappedBy = "poll", cascade = Array(CascadeType.ALL) , fetch = FetchType.EAGER)
    @OrderBy("id ASC")
    @BeanProperty
    var choices: Set[PollChoice] = _ 
}
