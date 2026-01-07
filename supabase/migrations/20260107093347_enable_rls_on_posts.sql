ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- すべての操作を許可するポリシー
CREATE POLICY "Allow all operations on posts"
ON posts
FOR All
TO public
USING(true)
WITH CHECK(true);