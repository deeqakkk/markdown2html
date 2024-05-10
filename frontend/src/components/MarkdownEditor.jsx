import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState()
  const handleMarkdownChange = (event) => {
    // setMarkdown(event.target.value)

    fetch('https://markdown2html.onrender.com/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdown: event.target.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMarkdown(data)
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <Grid>
      <Grid item xs={6}>
        <TextField
          label="Markdown"
          rows={100}
          variant="outlined"
          fullWidth
          value={markdown}
          onChange={handleMarkdownChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined" square>
          <Typography variant="h6">HTML Preview</Typography>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MarkdownEditor
