process.env.NODE_ENV = 'test'

const app = require('../src/app')
const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http')
const server = require("../src/server");
const should = chai.should();

chai.use(chaiHttp)

describe('POST /login', () => {
    it('Should attempt to login', () => {
        let testUser = {
            username: "test@gmail.com",
            password: "test123"
        }
       chai.request(server)
        .post('/api/login')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('POST /signup', () => {
    it('Should add user to database', () => {
        let testUser = {
            display_name: "test",
            username: "test@gmail.com",
            password: "test123"
        }
       chai.request(server)
        .post('/api/signup')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/users', () => {
    it('GET /api/users responds with 200', () => {
       chai.request(server)
        .get('/api/users')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })

    it('GET /api/users/:id responds with 200', () => {
        chai.request(server)
         .get('/api/users/1')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })

     it('Should update user in database', () => {
        let testUser = {
            display_name: "New test",
            username: "test@gmail.com",
            password: "test123"
        }
       chai.request(server)
        .put('/api/users/1')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })

    it('DELETE /api/users/:id deletes from the database', () => {
        chai.request(server)
         .get('/api/users/1')
         .end((err,res) => {
             res.should.have.status(200);
         })
     })
})

describe('/getNewContest', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/getNewContest')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('POST /addToCurrentStats', () => {
    it('Should add user to database', () => {
        let testUser = {
            user_id: 1,
            display_name: "test",
            username: "test@gmail.com",
            password: "test123"
        }
       chai.request(server)
        .post('/api/addToCurrentStats')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/userIdByUsername', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/userIdByUsername')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contest_to_user', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/contest_to_user')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contest_to_user/:id', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/contest_to_user/1')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contests', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/contests')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
    it('GET /contests/:id should respond with 200', () => {
        chai.request(server)
         .get('/api/contests/1')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('POST /contests should respond with 200', () => {
         const testContest = {
            date_start: '2020-01-01',
            date_end: '2020-02-02',
            contest_name: "test contest",
            weighin_day: "Friday",
         }
        chai.request(server)
         .post('/api/contests')
         .send()
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('POST /contests/auth should respond with 200', () => {
        const testContest = {
           date_start: '2020-01-01',
           date_end: '2020-02-02',
           contest_name: "test contest",
           weighin_day: "Friday",
        }
       chai.request(server)
        .post('/api/contests/auth')
        .send()
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
    it('POST /contests/getContestId should respond with 200', () => {
        const testContest = {
           date_start: '2020-01-01',
           date_end: '2020-02-02',
           contest_name: "test contest",
           weighin_day: "Friday",
        }
       chai.request(server)
        .post('/api/contests/getContestId')
        .send()
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contestInfo', () => {
    it('GET contestInfo/measurements should respond with 200', () => {
       chai.request(server)
        .get('/api/contestInfo/measurements')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
    it('GET contestInfo/userWeights should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/userWeights')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/points should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/points')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/sabotages should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/sabotages')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/contestUsers should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/contestUsers')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/contestUsersInfo should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/contestUsersInfo')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/currentStats should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/currentStats')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/sidebarStats should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/sidebarStats')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/weightPageStats should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/weightPageStats')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/contestUserIds should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/contestUserIds')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/groupWeightPageStats should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/groupWeightPageStats')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/contestUserWorkouts should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/contestUserWorkouts')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/weightProgress should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/weightProgress')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/measurementInfo should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/measurementInfo')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getUserPoints should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getUserPoints')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsGainedStomach should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsGainedStomach')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsGainedWeight should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsGainedWeight')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsGainedWorkout should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsGainedWorkout')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsGainedBingo should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsGainedBingo')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsSpentBlock should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsSpentBlock')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET contestInfo/getPointsSpentSabotage should respond with 200', () => {
        chai.request(server)
         .get('/api/contestInfo/getPointsSpentSabotage')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
})

describe('/points', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/points')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
    it('GET /points/bingo should respond with 200', () => {
        chai.request(server)
         .get('/api/points/bingo')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET /points/weight should respond with 200', () => {
        chai.request(server)
         .get('/api/points/weight')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET /points/stomach should respond with 200', () => {
        chai.request(server)
         .get('/api/points/stomach')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
     it('GET /points/workout should respond with 200', () => {
        chai.request(server)
         .get('/api/points/workout')
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
         })
     })
})

describe(' /contestInfo/logWorkout', () => {
    it('Should add workout to database', () => {
        let testWorkout = {
            contest_id: 1,
            user_id: 1,
            category: "cardio"
        }
       chai.request(server)
        .post('/api/contestInfo/logWorkout')
        .send(testWorkout)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe(' /contestInfo/logWeight', () => {
    it('Should add weight to database', () => {
        let testWeight = {
            contest_id: 1,
            user_id: 1,
            weight: 123
        }
       chai.request(server)
        .post('/api/contestInfo/logWeight')
        .send(testWeight)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe(' /contestInfo/logMeasurement', () => {
    it('Should add measurement to database', () => {
        let testMeasurement = {
            contest_id: 1,
            user_id: 1,
            measurement: 44
        }
       chai.request(server)
        .post('/api/contestInfo/logMeasurement')
        .send(testMeasurement)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe(' /contestInfo/logPointsWorkout', () => {
    it('Should add PointsWorkout to database', () => {
        let testPoints = {
            contest_id: 1,
            user_id: 1,
            points: 2
        }
       chai.request(server)
        .post('/api/contestInfo/logPointsWorkout')
        .send(testPoints)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe(' /contestInfo/logPoints', () => {
    it('Should add Points to database', () => {
        let testPoints = {
            contest_id: 1,
            user_id: 1,
            points: 2
        }
       chai.request(server)
        .post('/api/contestInfo/logPoints')
        .send(testPoints)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contestInfo/adminWeight', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/contestInfo/adminWeight')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/contestInfo/adminMeasurement', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/contestInfo/adminMeasurement')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('/admin/getAllUsers', () => {
    it('GET should respond with 200', () => {
       chai.request(server)
        .get('/api/admin/getAllUsers')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('POST /admin/addUserToContest', () => {
    it('Should add user to contest', () => {
        let testUser = {
            user_id: 1,
            contest_id: 1
        }
       chai.request(server)
        .post('/api/admin/addUserToContest')
        .send(testUser)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})

describe('PUT /currentStats/weight', () => {
    it('Should update weight in currentStats', () => {
        let testWeight = {
            current_weight: 123
        }
       chai.request(server)
        .post('/api/currentStats/weight')
        .send(testWeight)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        })
    })
})