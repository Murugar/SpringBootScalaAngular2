package com.iqmsoft.service

import scala.beans.BeanProperty
import scala.collection.JavaConversions._
import com.iqmsoft.domain._
import com.iqmsoft.dto.ChoiceStats
import com.iqmsoft.dto.PollStats
import com.iqmsoft.dto.Inner
import com.iqmsoft.repository.PollAnswerRepository
import com.iqmsoft.repository.PollRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util._

  

@Service
@Transactional
class PollService {
   
    @Autowired
    @BeanProperty
    var pollRepository : PollRepository = _

    @Autowired
    @BeanProperty
    var  pollAnswerRepository : PollAnswerRepository = _

    @Autowired
    @BeanProperty
    var entityManager : EntityManager = _

    def findAll() : List[Poll] = {
       return pollRepository.findAll() 
    }

    def findById(id : java.lang.Long) : Poll = {
        return pollRepository.findOne(id)
    }

    def savePollAnswer(answer : PollAnswer) : PollAnswer = {
        return pollAnswerRepository.save(answer)
    }

    def getPollStats() : ArrayList[PollStats] = {

    var q1: Query = this.entityManager.createQuery("SELECT p.id,p.name,count(a.id) as totalVote FROM PollAnswer a"
      + " JOIN a.pollChoice c"
      + " JOIN c.poll p"
      + " GROUP BY p.id")

    var results1: Array[Object] = q1.getResultList().toArray()

    var results2: List[Inner] = new ArrayList[Inner]()

    var i = 0

    for (x <- results1) {

      var u: Inner = new Inner()

      var o: Object = x

      var shit1 = o.isInstanceOf[Array[Object]]

      if (shit1) {
        var k = 0;

        var shit2 = x.asInstanceOf[Array[Object]]

        u.id = shit2(0).asInstanceOf[Long]
        u.name = shit2(1).asInstanceOf[String]
        u.co = shit2(2).asInstanceOf[Long]

        results2.add(u)
      }

      i = i + 1
    }

   // System.out.println("Poll Service")

   // System.out.println(results1)

    var results: List[Inner] = results2

    var stats: ArrayList[PollStats] = new ArrayList[PollStats]();

    for (x <- results) {

      var q2: Query = this.entityManager.createQuery("SELECT c.id,c.choice,count(a.id) as totalVote FROM PollAnswer a"
        + " JOIN a.pollChoice c"
        + " JOIN c.poll p"
        + " WHERE p.id = :id"
        + " GROUP BY c.id");

      var results3: List[Inner] = new ArrayList[Inner]()

      var results4: Array[Object] = q2.setParameter("id", x.id).getResultList().toArray()

      var k = 0

      for (x <- results4) {

        var u: Inner = new Inner()

        var o: Object = x

        var shit1 = o.isInstanceOf[Array[Object]]

        if (shit1) {

          var shit2 = x.asInstanceOf[Array[Object]]

          u.id = shit2(0).asInstanceOf[Long]
          u.name = shit2(1).asInstanceOf[String]
          u.co = shit2(2).asInstanceOf[Long]

          results3.add(u)
        }

        k = k + 1
      }

      var choices: List[Inner] = results3

      var choiceStats: ArrayList[ChoiceStats] = new ArrayList[ChoiceStats]();

      choices.foreach(x1 =>

        {
          if (x1 != null) {
            if (x1.id != null) {
              var choiceStat: ChoiceStats = new ChoiceStats();
              choiceStat.id = x1.id
              if (x1.name != null) {
                choiceStat.choice = x1.name
              }
              if (x1.co != null) {
                choiceStat.totalVote = x1.co
              }
              choiceStats.add(choiceStat);
            }
          }

        })

      var stat: PollStats = new PollStats();

      stat.id = x.id
      stat.name = x.name

      stat.totalVote = x.co

      stat.choices = choiceStats

      stats.add(stat);

    }

    return stats
  }
}

