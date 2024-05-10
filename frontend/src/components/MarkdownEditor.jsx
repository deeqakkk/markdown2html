import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('hello world')
  const [textValue, setTextValue] = useState('')

  const handleMarkdownChange = (event) => {
    const newValue = event.target.value
    setTextValue(newValue)
    fetch('https://markdown2html.onrender.com/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdown: newValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMarkdown(data.html)
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
          value={textValue}
          onChange={(e) => handleMarkdownChange(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <Paper variant="outlined" square>
          <Typography variant="h6">HTML Preview</Typography>
          <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MarkdownEditor
