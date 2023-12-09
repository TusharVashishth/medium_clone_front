type AuthStateType = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  short_description: string;
  image?: string;
  created_at: string;
  user: User;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: User;
};
