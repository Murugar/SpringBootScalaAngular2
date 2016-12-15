package com.iqmsoft.repository

import org.springframework.data.domain.{Pageable, Page}
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import com.iqmsoft.domain.Post


@Repository
trait PostRepository extends JpaRepository[Post, java.lang.Long] {

  def findByTitleStartingWithOrContentStartingWith(title: String, content: String, pageable: Pageable): Page[Post]

}
