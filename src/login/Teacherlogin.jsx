import React, { useState } from 'react'
import { Container, Typography, Stack, TextField, Button, Alert, Box } from '@mui/material'

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    email: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/teacher/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      setStatus({ type: 'success', message: 'Teacher added successfully!' })
      setFormData({ teacherName: '', email: '' })
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to add teacher.' })
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Add Teacher
        </Typography>
        {status && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}
        <Stack spacing={3}>
          <TextField
            name="teacherName"
            label="Teacher Name"
            value={formData.teacherName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Teacher
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default TeacherForm