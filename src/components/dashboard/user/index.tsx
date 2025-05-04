import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Project = {
  name: string;
  members: string[];
};

type UserDashboardProps = {};

const UserDashboard: React.FC<UserDashboardProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve current user from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);

    // If no user is logged in, navigate to login page
    if (!user) {
      navigate('/login');
    }

    // Retrieve stored projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Filter projects by user's team (assuming projects have 'members' which include the user)
    const userProjects = storedProjects.filter((project: Project) => project.members.includes(user.name));
    setProjects(userProjects);
  }, [navigate]);

  // Handle logging out
  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome User, {currentUser?.name}
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        Logout
      </Button>

      <Grid container spacing={4} sx={{ maxWidth: '900px', margin: '0 auto' }}>
        

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            ➤ My Projects
          </Typography>
          {projects.length === 0 ? (
            <Typography>No projects assigned to you</Typography>
          ) : (
            projects.map((project, index) => (
              <Box key={index} sx={{ padding: '1rem', marginBottom: '1rem', border: '1px solid #ccc' }}>
                <Typography variant="body1" gutterBottom>
                  ▸ {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  - Members: {project.members.join(', ')}
                </Typography>
              </Box>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
