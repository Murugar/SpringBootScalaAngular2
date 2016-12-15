package com.iqmsoft.repository

import com.iqmsoft.domain.Poll
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.data.repository.CrudRepository

@Repository
trait PollRepository extends JpaRepository[Poll,java.lang.Long] {
 
}