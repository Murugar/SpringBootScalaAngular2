package com.iqmsoft.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import com.iqmsoft.domain.Account

/**
  * Created by wonwoo on 2016. 3. 9..
  */
@Repository
trait AccountRepository extends JpaRepository[Account, java.lang.Long] {
  def findByName(name: String): Account
}
