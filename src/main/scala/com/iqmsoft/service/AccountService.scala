package com.iqmsoft.service


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import com.iqmsoft.domain.Account
import com.iqmsoft.repository.AccountRepository
import com.iqmsoft.exception.AccountNotFoundException


/**
  * Created by wonwoo on 2016. 3. 9..
  */
@Service
@Transactional
class AccountService @Autowired()(accountRepository: AccountRepository) {

  @Transactional(readOnly = true)
  def account(id: Long): Account = {
    Option(accountRepository.findOne(id)) getOrElse (throw AccountNotFoundException("account id $id  not found"))
  }

  def save(account: Account) = {
    accountRepository.save(account)
  }

  def update(id: Long, account: Account) = {
    val oldAccount = this.account(id)
    
  
    
    account.setId(oldAccount.getId)
    if (!Option(account.getName).exists(_.nonEmpty))
      account.setName(oldAccount.getName)
    if (!Option(account.getPassword).exists(_.nonEmpty))
      account.setPassword(oldAccount.getPassword)
    accountRepository.save(account)
  }

  def delete(id: Long) {
    accountRepository.delete(id)
  }
}
