export type ArticleType = {
  text: HTMLElement | null,
  comments:
    {
      id: string,
      text: string,
      date: string,
      likesCount: number,
      dislikesCount: number,
      user: {
        id: string,
        name: string
      }
      like?: boolean,
      dislike?: boolean,
    }[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string
}
