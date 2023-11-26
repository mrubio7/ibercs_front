import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Api from '../../api';


const columns = [
  { field: 'id', headerName: 'N', width: 90 },
  {
    field: 'faceitNickname',
    headerName: 'Faceit nickname',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'faceitElo',
    headerName: 'Faceit Elo',
    type: 'number',
    width: 150,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200,
    align: 'center',
    headerAlign: 'center',
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
          "faceitElo": player.faceit_elo,
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