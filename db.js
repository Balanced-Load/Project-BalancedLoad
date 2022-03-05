const res = require('express/lib/response');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: process.env.USER,
  database: 'products',
})

module.exports = {
  retrieveFiveProducts: (callback) => {
    pool.query('select * from product limit 5', callback);
  },

  retrieveProdDetails: (id, callback) => {
    const qString = "SELECT json_build_object('id', (SELECT id from product where id = $1), 'name', (SELECT name from product where id = $1 ),'slogan', (SELECT slogan from product where id = $1),'description', (SELECT description from product where id = $1), 'category', (SELECT category from product where id = $1), 'default_price', (SELECT default_price from product where id = $1),'features', (SELECT json_agg(row_to_json(features)) from (SELECT feature, value from features where product_id = $1)features));"
    pool.query(qString, [id], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows[0].json_build_object);
      }
    });
  },

  retrieveStyles: (id, callback) => {
    const qString = "SELECT json_agg( json_build_object( 'style_id', styles.style_id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default,'photos', (SELECT coalesce(photos, '[]'::json) FROM (SELECT json_agg(json_build_object( 'thumbnail_url', photos.thumbnail_url,'url', photos.url) ) AS photos from photos WHERE photos.styleId = styles.style_id) as photos),'skus', (SELECT coalesce(skus, '{}'::json) FROM (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity,'size', skus.size)) AS skus from skus WHERE skus.styleId = styles.style_id) as skus))) AS results from styles where styles.productId = $1;"
    pool.query(qString, [id], (err, result) => {
      if (err) {
        callback(err);
      } else {
        let tempObj = result.rows[0]
        tempObj.product_id = id;
        callback(null, tempObj);
      }
    });
  },

  retrieveRelated: (id, cb) => {
    pool.query('select json_agg(related_product_id) as data from related where current_product_id = $1', [id])
    .then(result => cb(null, result.rows[0].data))
    .catch(err => cb(err));
  },
}




// retrieveStyles with promises:
// pool.query('select * from styles where productID = $1', [id])
// .then((result) => {
//   Promise.all(result.rows.map(obj => new Promise ((resolve, reject) => {
//     pool.query('select url, thumbnail_url from photos where styleID = $1', [obj.style_id])
//     .then((result) => {
//       obj.photos = result.rows;
//       resolve(obj)})
//     // console.log(obj)
//   })))
//   .then(result => callback(null, result))
// })

// retrieveProdDetails with promises:
      // (err, result) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     let tempObj = result.rows[0];
    //     pool.query('select feature, value from features where product_id = $1', [id], (err, result) => {
    //       if (err) {
    //         callback(err);
    //       } else {
    //         tempObj.features = result.rows;
    //         callback(null, tempObj);
    //       }
    //     })
    //   }
    // });

        // pool.query('select feature, value from features where product_id = $1', [id], (err, result) => {
        //   if (err) {
        //     callback(err);
        //   } else {
        //     // tempObj.features = result.rows;
        //     callback(null, result.rows);
        //   }
        // })