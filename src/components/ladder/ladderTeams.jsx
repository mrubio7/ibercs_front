import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Api from '../../api';
import { Avatar } from '@mui/material';

function getColorForScore(score) {
  const minScore = 0;
  const maxScore = 3600;
  const minColor = [255, 215, 0]; // Amarillo en RGB
  const maxColor = [255, 20, 147]; // Rosa en RGB

  const factor = (score - minScore) / (maxScore - minScore);
  const color = interpolateColor(minColor, maxColor, factor);

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function interpolateColor(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

const columns = [
  { field: 'id', headerName: 'N', width: 30 },
  {
    field: 'avatar',
    headerName: '',
    width: 20,
    align: 'center',
    headerAlign: 'right',
    sortable: false,
    filterable: false,
    hidable: false,
    renderCell: (params) => (
        <Avatar sx={{ width: 34, height: 34 }} src={params.row.faceit_avatar} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 400,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'faceit_average_elo',
    headerName: 'Average elo',
    width: 200,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => {
      const color = getColorForScore(params.row.faceit_average_elo);
      return (
          <Box
              sx={{
                  backgroundColor: color,
                  padding: '5px 8px',
                  borderRadius: 1,
                  fontWeight: 'bold',
              }}
          >
              {params.row.faceit_average_elo}
          </Box>
      );
    },
  }, 
];

const LadderTeams = () => {
  const [teams, setTeams] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const teams = await Api.Teams.getAll();
      setTeams(teams.data.result);
    }

    getTeams();
  }, []);

  useEffect(() => {
    const rows = 
      teams.map((team, index) => {
        return {
          "id": index + 1,
          "name": team.faceit_name,
          "faceit_avatar": team.faceit_avatar,
          "faceit_average_elo": team.faceit_average_elo,
          "faceit_url": team.faceit_url,
        }
      });
    setRows(rows);
  }, [teams]);

  return (
      <Box sx={{ height: 750, width: '100%' }}>
          <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 10,
                    },
                },
              }}
              loading={teams.length === 0}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
          />
      </Box>
  );
}

export default LadderTeams;