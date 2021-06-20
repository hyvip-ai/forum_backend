const Query = require('../models/discuss')
const Answer = require('../models/answers')
const moment = require('moment')

function getqueries(req,res){
    Query.find({askedby:{$ne:req.user.sub}}).populate('askedby','username').exec((err,queries)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(queries){
            return res.send({messege:queries});
        }
    })
}

function myqueries(req,res){
    // console.log("asche")
    Query.find({askedby:req.user.sub}).exec((err,queries)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(queries){
            // console.log(queries)
            return res.send({messege:queries});
        }
    })
}


function postquery(req,res){
        if(req.body.question){
            var query = new Query();

            query.question = req.body.question;
            query.askedby = req.user.sub;
            query.time = moment().unix()
            query.save((err,saved)=>{
                if(err){
                    return res.send({messege:'Error Occured'})
                }
                if(saved){
                    return res.send({messege:'Published',data:saved})
                }
            })
            
        }
        else{
            return res.send({messege:'Invalid Data'});
        }

}


function answerquery(req,res){
    if(req.body.answer){
        var answer = new Answer();
        answer.question = req.params.id;
        answer.answerdby = req.user.sub;
        answer.answer = req.body.answer;
        answer.right = 0;
        
        answer.time = moment().unix();
        answer.save((err,saved)=>{
            if(err){
                return res.send({messege:'Error Occured'})
            }
            if(saved){
                Query.findOneAndUpdate({_id:req.params.id},{$push:{answers:saved._id}}).exec((err,updated)=>{
                    if(err){
                        console.log('error occcured')
                    }
                    if(updated){
                        console.log(updated)
                    }
                })
                return res.send({messege:'Published',data:saved})
            }
        })
    }   
    else{
        res.send({messege:'Invalid Data'});
    }
}

function rightvote(req,res){
    var id = req.params.id
    Answer.findOneAndUpdate({_id:id},{$inc:{right:1},$push:{clicked:req.user.sub}}).exec((err,done)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(done){
            return res.send({messege:'Voted',data:done})
        }
    })
}

function wrongvote(req,res){
    var id = req.params.id
    console.log(req.user.sub)
    console.log(typeof(req.user.sub))
    Answer.findOneAndUpdate({_id:id},{$inc:{right:-1},$pullAll:{clicked:[req.user.sub]}}).exec((err,done)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(done){
            return res.send({messege:'Voted',data:done})
        }
    })
}
function questiondetail(req,res){
    Query.findOne({_id:req.params.id}).populate('askedby','username').exec((err,data)=>{
        if(err){
            return res.send({messege:'Inavlid Data'});

        }
        if(data){
            // console.log(data)
            return res.send({data:data});
        }
    })
}
function getanswers(req,res){
    Answer.find({question:req.params.id}).populate('answerdby','username').exec((err,answers)=>{
        if(err){
            return res.send({messege:'Error Occured'});
        }
        if(answers){
            return res.send({data:answers});
        }
    })
}

function deletequery(req,res){
    Query.findOneAndDelete({_id:req.params.id}).exec((err,data)=>{
        if(err){
            return res.send({messege:'Error Occured'})
        }
        if(data){
            return res.send({data:data})
        }
    })

}

module.exports = {
    postquery,
    answerquery,
    rightvote,
    wrongvote,
    getqueries,
    myqueries,
    questiondetail,
    getanswers,
    deletequery
}