package com.iqmsoft.repository

import com.iqmsoft.domain.PollAnswer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.data.repository.CrudRepository

@Repository
trait PollAnswerRepository extends JpaRepository[PollAnswer,java.lang.Long] {
 
}