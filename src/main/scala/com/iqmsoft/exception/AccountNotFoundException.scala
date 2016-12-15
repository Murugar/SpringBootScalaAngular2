package com.iqmsoft.exception

import org.springframework.web.bind.annotation._
import org.springframework.http.HttpStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
case class AccountNotFoundException(message: String) extends RuntimeException(message)
