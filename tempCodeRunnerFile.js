use("lims");
db.getCollection("doctors")
db.getCollection("doctors").find({}, {name: 1, _id: 0})
