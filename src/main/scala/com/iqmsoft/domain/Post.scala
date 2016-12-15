package com.iqmsoft.domain

import java.util.Date
import javax.persistence._
import javax.validation.constraints.{Size, NotNull}
import org.springframework.data.jpa.repository.Temporal
import scala.beans.BeanProperty

/**
  * Created by wonwoo on 2016. 3. 9..
  */
@Entity
class Post {

  @Id
  @GeneratedValue
  @BeanProperty
  var id: Long = _

  @BeanProperty
  @NotNull
  @Size(max = 100, min = 5)
  var title : String = _

  @BeanProperty
  var content : String = _

  @BeanProperty
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name="reg_date")
  var regDate : Date = _

}
