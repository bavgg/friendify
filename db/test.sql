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
            'comment_content',
            c.content,
            'comment_user_id',
            u.user_id,
            'comment_user_name',
            CONCAT (u.firstname, ' ', u.lastname)
        )
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
                and l.user_id = 17
        ) then true
        else false
    end as is_liked
from
    posts p
    left join "comments" c on p.post_id = c.post_id
    join users u on u.user_id = p.user_id
    left join likes l on l.post_id = p.post_id
group by
    u.user_id,
    p.post_id
order by
    p.created_at desc