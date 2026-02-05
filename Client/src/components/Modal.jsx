import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TransitionsModal({ icon, width, strokeWidth }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const IconComponent = icon;
  return (
    <div>
      <Button onClick={handleOpen}>
        <IconComponent width={width} strokeWidth={strokeWidth} />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Block renderName
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to block this user?
            </Typography>
            <div className="mt-5 space-x-4">
              <button
                onClick={handleClose}
                className="rounded-md border border-gray-300 px-6 py-1 hover:bg-black hover:text-white"
              >
                Yes
              </button>
              <button
                onClick={handleClose}
                className="rounded-md bg-emerald-400 px-6 py-1 hover:bg-black hover:text-white"
              >
                No
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
