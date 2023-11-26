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
  { field: 'id', headerName: 'N', width: 40 },
  {
    field: 'username',
    headerName: 'Username',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'avatar',
    headerName: '',
    width: 90,
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    filterable: false,
    hidable: false,
    renderCell: (params) => (
        <Avatar sx={{ width: 34, height: 34 }} src={params.row.faceit_avatar} />
    ),
  },
  {
    field: 'faceitNickname',
    headerName: 'Faceit',
    width: 100,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'faceitElo',
    headerName: 'Elo',
    type: 'number',
    width: 80,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => {
      const color = getColorForScore(params.row.faceit_elo);
      return (
          <Box
              sx={{
                  backgroundColor: color,
                  padding: '5px 8px',
                  borderRadius: 1,
                  fontWeight: 'bold',
              }}
          >
              {params.row.faceit_elo}
          </Box>
      );
    },
  },
  {
    field: 'space',
    headerName: '',
    width: 100,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'faceit_avg_kills',
    headerName: 'Avg. Kills',
    width: 100,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'faceit_avg_rating',
    headerName: 'Avg. Rating',
    width: 100,
    align: 'left',
    headerAlign: 'left',
  },
];

const LadderPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const players = await Api.Players.getPlayersOrderedByElo();
      setPlayers(players.data.result);
    }

    getPlayers();
  }, []);

  useEffect(() => {
    const rows = 
      players.map((player, index) => {
        return {
          "id": index + 1,
          "username": player.Nickname,
          "faceitNickname": player.faceit_nickname,
          "faceit_elo": player.faceit_elo,
          "faceit_avatar": player.faceit_avatar,
          "faceit_avg_kills": player.faceit_avg_kills,
          "faceit_avg_rating": player.faceit_avg_rating,
        }
      });
    setRows(rows);
  }, [players]);

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
              loading={players.length === 0}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
          />
      </Box>
  );
}

export default LadderPlayers;