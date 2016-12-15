package com.iqmsoft.controller

import javax.validation.Valid
import com.iqmsoft.exception.BadRequestException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation._
import com.iqmsoft.domain.Account
import com.iqmsoft.repository.AccountRepository
import com.iqmsoft.service.AccountService
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.http.HttpStatus


@RestController
@RequestMapping(value = Array("/api"))
class AccountController @Autowired()(accountRepository: AccountRepository, accountService: AccountService) {

  @RequestMapping(value = Array("/accounts"), method = Array(RequestMethod.GET))
  @ResponseStatus(HttpStatus.OK)
  def accounts(pageable: Pageable) = accountRepository.findAll(pageable)

  @RequestMapping(value = Array("/account/{id}"), method = Array(RequestMethod.GET))
  @ResponseStatus(HttpStatus.OK)
  def account(@PathVariable id: Long) = accountService.account(id)

  @RequestMapping(value = Array("/account/search/{name}"), method = Array(RequestMethod.GET))
  @ResponseStatus(HttpStatus.OK)
  def account(@PathVariable name: String) = accountRepository.findByName(name)

  @RequestMapping(value = Array("/account"), method = Array(RequestMethod.POST))
  @ResponseStatus(HttpStatus.CREATED)
  def createAccount(@Valid @RequestBody account: Account, bindingResult: BindingResult) = {
    if (bindingResult.hasErrors) throw BadRequestException(bindingResult.getFieldError.getDefaultMessage)
    accountService.save(account)
  }

  @RequestMapping(value = Array("/account/{id}"), method = Array(RequestMethod.PATCH))
  @ResponseStatus(HttpStatus.OK)
  def updateAccount(@PathVariable id: Long, @Valid @RequestBody account: Account, bindingResult: BindingResult) = {
    if (bindingResult.hasErrors) throw BadRequestException(bindingResult.getFieldError.getDefaultMessage)
    accountService.update(id, account)
  }

  @RequestMapping(value = Array("/account/{id}"), method = Array(RequestMethod.DELETE))
  @ResponseStatus(HttpStatus.NO_CONTENT)
  def deleteAccount(@PathVariable id: Long) = {
    accountService.delete(id)
  }
}
