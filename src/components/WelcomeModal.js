import * as React from 'react';
import {Box, Button, Typography, Modal } from '@mui/material';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#012b53',
  border: '2px solid #012b53',
  boxShadow: 24,
  p: 4,
  outline : 'none',
  color : '#FFF',
};

export default function WelcomeModal() {
  const [open, setOpen] = React.useState(true);
//   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" className='modalHeader' variant="h3" component="h2">
            Welcome
          </Typography>
          <Typography id="modal-modal-description" className='modalPara' sx={{ mt: 4, fontSize: 14, }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.  Duis mollis, est non commodo luctus, nisi erat porttitor ligula. 
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.  Duis mollis, est non commodo luctus, nisi erat porttitor ligula. 
          </Typography>
          <Button type="button" variant="contained" onClick={handleClose} className="modalBtn btn btn-theme text-center " style={{ padding: 5, marginTop: 20  }}>ok</Button>
        </Box>
      </Modal>
    </div>
  );
}
