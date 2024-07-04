import { client } from "../database.config.mjs";

export async function fetch_posts(user_id) {
  const query = `
        select
            u.firstname || ' ' || u.lastname as fullname,
            p.post_id,
            p.user_id,
            p."content",
            count(distinct l.like_id) as like_count,
            json_agg (
                json_build_object (
                    'comment_id',
                    c.comment_id,
                    'content',
                    c.content,
                    'comment_user_id',
                    c.user_id,
                    'fullname',
                    CONCAT (cu.firstname, ' ', cu.lastname)
                )
                order by c.created_at desc  
            ) filter (
                where
                    c.comment_id is not null
            ) as comments,
            case
                when exists (
                    select
                        1
                    from
                        likes l
                    where
                        l.post_id = p.post_id
                        and l.user_id = $1
                ) then true
                else false
            end as is_liked
        from
            posts p
            left join "comments" c on p.post_id = c.post_id
            join users u on u.user_id = p.user_id
            left join users cu on cu.user_id = c.user_id
            left join likes l on l.post_id = p.post_id
        group by
            u.user_id,
            p.post_id
        order by
            p.created_at desc
  `;
  const values  = [user_id];

  const result = await client.query(query, values);
  // console.log(result.rows);
  
  return result.rows;
}
// fetch_posts();

// SELECT 
//     CONCAT(users.firstname, ' ', users.lastname) AS fullname, 
//     posts.content,
//     COUNT(likes.id) AS like_count
// FROM 
//     posts
// JOIN 
//     users ON posts.user_id = users.id
// LEFT JOIN 
//     likes ON likes.post_id = posts.id
// GROUP BY 
//     posts.id, users.firstname, users.lastname, posts.content;

