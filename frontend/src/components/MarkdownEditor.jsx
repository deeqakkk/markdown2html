import Grid from '@mui/material/Grid'
import { useState } from 'react'
import Typography from '@mui/material/Typography'

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('<h1>Hello World </h1>')
  const [textValue, setTextValue] = useState('# Hello World')

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
      <Grid
       className='topbar'
      >
        <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
          Markdown Preview Generator
        </Typography>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={6} item={true} className='markdown'>
          <textarea
            placeholder="Markdown"
            rows={15}
            value={textValue}
            onChange={(e) => handleMarkdownChange(e)}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} item={true} className='preview'>
          <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MarkdownEditor
