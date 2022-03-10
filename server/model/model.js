const pool = require('../../db/db.js')

module.exports = {
  retrieveFiveProducts: (callback) => {
    pool.query('select * from product FETCH FIRST 5 ROWS ONLY', callback);
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
        tempObj.product_id = JSON.parse(id);
        callback(null, tempObj);
      }
    });
  },

  retrieveRelated: (id, callback) => {
    pool.query('select json_agg(related_product_id) as data from related where current_product_id = $1', [id])
    .then(result => callback(null, result.rows[0].data))
    .catch(err => callback(err));
  },
}
