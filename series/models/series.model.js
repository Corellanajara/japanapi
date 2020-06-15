const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Serieschema = new Schema({
titulo : String,
autor : String,
categoria : Array,
img : String,
capitulos : Array,
estado : Boolean,
compartido : Boolean,

}, { timestamps: true }
);
Serieschema.virtual('id').get(function () {
return this._id.toHexString();
});
Serieschema.set('toJSON', {
virtuals: true
});

Serieschema.findById = function (cb) {
return this.model('Series').find({id: this.id}, cb);
};
const Series = mongoose.model('Series', Serieschema);
exports.findById = (id) => {
return Series.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createSeries = (SeriesData) => {
const series = new Series(SeriesData);
return series.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Series.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, series) {
if (err) {
reject(err);
} else {
resolve(series);
}
})
});
};
exports.patchSeries = (id, SeriesData) => {
return new Promise((resolve, reject) => {
Series.findById(id, function (err, series) {
if (err) reject(err);

console.log(SeriesData);
for (let i in SeriesData) {
series[i] = SeriesData[i];
}
series.save(function (err, updatedSeries) {
if (err) return reject(err);
resolve(updatedSeries);
});
});
})
};
exports.removeById = (SeriesId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: SeriesId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};