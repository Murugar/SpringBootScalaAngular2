package com.iqmsoft.domain

import javax.persistence._
import javax.validation.constraints.{Size, NotNull}
import scala.beans.BeanProperty


/**
  * Created by wonwoo on 2016. 3. 9..
  */
@Entity
class Account{

  @Id
  @GeneratedValue
  @BeanProperty
  var id: java.lang.Long = _

  @BeanProperty
  @NotNull
  @Size(max = 100, min = 3)
  var name: String = _

  @BeanProperty
  var password: String = _


}
