export default {
  id: '',
  author_id: '',
  tab: '',
  content: '',
  title: '',
  author: {
    name: '',
    avatar: '',
  },
  replies: [],
  create: (data) => {
    return Object.assign({}, this, data)
  }
}
