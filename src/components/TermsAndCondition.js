import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { autocompleteClasses, Hidden } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    maxHeight : 900,
    overflowY: 'scroll',
};

export default function TermsModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <h3>Terms and conditions</h3>
                  <h6>Introduction </h6>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>1. </td><td>These terms and conditions for the AIG Women’s Open Health Zone Steps Challenge apply to you, so please read them carefully. </td></tr>
                      <tr><td>2. </td><td>The  AIG Women’s Open Health Zone Steps Challenge is operated on behalf of R&amp;A Championships Limited (“The R&amp;A”) by Provision Events Ltd (07136878) whose registered office is at First Floor, 129 High Street, Guildford, Surrey, United Kingdom, GU1 3AA (the “Operator”).</td></tr>
                      <tr><td>3. </td><td>If you participate in any activity in the AIG Women’s Open Health Zone Steps Challenge you do so at your own risk, so you should always act in a safe and responsible manner.</td></tr>
                      <tr><td>4. </td><td>It is your responsibility to supervise any children under the age of 16 in your care, and to look after your belongings.</td></tr>
                      <tr><td>5. </td><td>Any instructions given by the Operator or its staff must be followed in the interests of safety and security.</td></tr>
                    </tbody>
                  </table>
                  <h6>Entrance</h6>
                  <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>6. </td><td>Entry to the AIG Women’s Open Health Zone Steps Challenge is free of charge.</td></tr>
                    </tbody>
                  </table>
                  <h6>Rules of the AIG Women’s Open Health Zone Steps Challenge</h6>
                  <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>7. </td><td>The AIG Women’s Open Health Zone Steps Challenge is open to all visitors during the AIG Women’s Open however entrance is subject to availability and is not guaranteed. </td></tr>
                      <tr><td>8. </td><td>All children under the age of 16 must be accompanied by an adult to enter the AIG Women’s Open Health Zone Steps Challenge and at all times while in the AIG Women’s Open Health Zone Steps Challenge area.</td></tr>
                      <tr><td>9. </td><td>The purpose of the AIG Women’s Open Health Zone Steps Challenge is for fans at the event to demonstrate and compare the amount of steps they have completed, whist at the event.</td></tr>
                      <tr><td>10. </td><td>The Operator’s staff reserve the right to refuse entry or to ask you to leave the AIG Women’s Open Health Zone Steps Challenge or any activity within it.</td></tr>
                      <tr><td>11. </td><td>Nothing may be removed from the AIG Women’s Open Bunker Shot Challenge unless given by an authorised member of staff as a free gift.</td></tr>
                    </tbody>
                  </table>
                  <h6>Activities and Promotions within the AIG Women’s Open Health Zone Steps Challenge</h6>
                  <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>12. </td><td>The Operator reserves the right to change these Terms and Conditions or cancel any activities within the AIG Women’s Open Health Zone Steps Challenge without specifying reasons and without incurring liability as a result. The decision of the Operator is final, and binding and no correspondence will be entered into. The Operator and its contractors are not responsible or liable if for any reason the AIG Women’s Open Health Zone Steps Challenge does not open as planned or for any other cause beyond the control of the Operator.</td></tr>
                    </tbody>
                  </table>
                  <h6>Operator's Responsibility for the AIG Women’s Open Health Zone Steps Challenge</h6>
                  <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>13. </td><td>In clauses 14 to 16 a reference to "we", "us" and "our" refers to the Operator, its Group companies and its contractors and a reference to "you" refers to you. </td></tr>
                      <tr><td>14. </td><td>Subject to clauses 15 and 16, if we fail to comply with these Terms and Conditions, we shall not be responsible for any losses that you suffer as a result.  Except for those losses which we could reasonably foresee, which result from the failure to comply with these Terms and Conditions and shall not prevent claims for foreseeable loss of, or damage to, your physical property. </td></tr>
                      <tr><td>15. </td><td>Clauses 14 and 16 do not exclude or limit in any way our liability for: (a) death or personal injury caused by our negligence, (b) fraud or fraudulent misrepresentation, and/or (c) any other matter for which it would be unlawful for us to exclude or attempt to exclude our liability. </td></tr>
                      <tr><td>16. </td><td>We shall not be responsible (to the extent permitted by law) for any losses or injury that arise as a result of your redemption, use or enjoyment of any prizes won as a result of your participation in activities and competitions within the AIG Women’s Open Health Zone Steps Challenge.</td></tr>
                      <tr><td>17. </td><td>Participants release The R&amp;A for all claims and liabilities arising in respect of the AIG Women’s Open Health Zone Steps Challenge.</td></tr>
                      <tr><td>18. </td><td>These Terms and Conditions and any disputes arising from these Terms and Conditions are governed by the laws of England and the exclusive jurisdiction of the English Courts.</td></tr>
                    </tbody>
                  </table>
                  <h6>Leader board process and data capture use</h6>
                  <table className="disclaimer-table">
                    <tbody valign="top">
                      <tr><td width={25}>19. </td><td>During participation in the AIG Women’s Open Health Zone Steps Challenge, participants can enter their name and email address as their unique ID. The email address is only used to create a unique ID profile for the participant, and will not be used for any other purposes.</td></tr>
                      <tr><td>21. </td><td>The participant can then input the number of steps they have done, using pedometer wristbands, phones or any other device which provides a step count based on their movements.</td></tr>
                      <tr><td>22. </td><td>The participant can input their step count multiple times throughout the day, with the leaderboard reflecting the updated number against their name.</td></tr>
                      <tr><td>23. </td><td>Once the event is over, the Operator will immediately delete the data captured for all participants and no data will be used for any purpose.</td></tr>
                    </tbody>
                  </table>
          </Typography>
        </Box>
      </Modal>
    </div>



    
    );
}
