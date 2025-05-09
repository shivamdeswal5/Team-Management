import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Project = {
  name: string;
  members: string[];
};

type TeamLeadProps = {};

const TeamLeadDashboard: React.FC<TeamLeadProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);

    const storedUsers = JSON.parse(localStorage.getItem('user') || '[]');
    setTeamMembers(storedUsers.filter((user: any) => user.role === 'user').map((user: any) => user.name));

    if (!user) {
      navigate('/login');
    }

    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(storedProjects);
  }, [navigate]);

  const handleAddProject = () => {
    const newProject: Project = {
      name: newProjectName,
      members: selectedMembers,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);

    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    setNewProjectName('');
    setSelectedMembers([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome Team Lead, {currentUser?.name}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        Logout
      </Button>

      <Grid container spacing={4} sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {/* Conditionally render "My Team" */}
            {currentUser?.team ? `➤ My Team: ${currentUser.team}` : ''}
          </Typography>

          <Box sx={{ marginBottom: '2rem' }}>
            <Typography variant="body1" gutterBottom>
              ➤ Create Project
            </Typography>
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
              <InputLabel>Team Members</InputLabel>
              <Select
                multiple
                value={selectedMembers}
                onChange={(e) => setSelectedMembers(e.target.value as string[])}
                label="Team Members"
                renderValue={(selected) => selected.join(', ')}
              >
                {teamMembers.map((member, index) => (
                  <MenuItem key={index} value={member}>
                    {member}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleAddProject}>
              Create Project
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            ➤ My Projects
          </Typography>
          {projects.length === 0 ? (
            <Typography>No projects created yet</Typography>
          ) : (
            projects.map((project, index) => (
              <Box key={index} sx={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc' }}>
                <Typography variant="body1" gutterBottom>
                  ▸ {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  - Members: {project.members.join(', ')}
                </Typography>
                <Button variant="outlined" color="primary" sx={{ marginRight: '1rem' }}>
                  Edit Project
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    const updatedProjects = projects.filter((_, i) => i !== index);
                    setProjects(updatedProjects);
                    localStorage.setItem('projects', JSON.stringify(updatedProjects));
                  }}
                >
                  Delete Project
                </Button>
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamLeadDashboard;
