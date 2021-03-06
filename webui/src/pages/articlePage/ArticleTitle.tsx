import React, { FC, useState } from "react"
import { Alert } from "rsuite"
import Article from "../../models/Article"
import { useHistory } from "react-router-dom"
import { requestDeleteArticle, requestUpdateTitle } from "../../apis/ArticleApi"
import ManagedTitle from "../../component/common/ManagedTitle"
import { reloadAfterTick } from "../../common/Utils"


interface Props {
  article: Article | null
}

const ArticleTitle: FC<Props> = ({article}) => {
  const [submitFetching, setSubmitFetching] = useState(false)
  const [deleteFetching, setDeleteFetching] = useState(false)
  const history = useHistory()

  const onSubmit = (title: string) => {
    setSubmitFetching(true)
    requestUpdateTitle(article!.id, title)
      .then(() => window.location.reload())
      .catch(err => {
        Alert.error(err.toString())
        setSubmitFetching(false)
      })
  }

  const onDelete = () => {
    setDeleteFetching(true)
    requestDeleteArticle(article!.id)
      .then(() => {
        if (history.length === 1) {
          history.push('/')
        } else {
          history.goBack()
          reloadAfterTick()
        }
      })
      .catch(err => {
        Alert.error(err.toString())
        setDeleteFetching(false)
      })
  }

  return (
    <ManagedTitle
      title={article ? article.title : '...'}
      onSubmit={onSubmit}
      onDelete={onDelete}
      submitFetching={submitFetching}
      deleteFetching={deleteFetching}
    />
  )
}

export default ArticleTitle
