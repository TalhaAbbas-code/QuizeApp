import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import TrophyImage from "../assets/images/Graduate.png"; 
import { useNavigate } from "react-router-dom";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  correct: number;
  total: number;
  percentage: number;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  correct,
  total,
  percentage,
  
}) => {
    const navigate = useNavigate();
    const handleClose = () => {
      onClose(); 
      navigate("/home"); 
    };
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center ">
        <img
          src={TrophyImage}
          alt="Trophy"
          style={{ width: 100, margin: "0 auto", padding: "" }}
        />
        <Typography variant="h5" className="mt-2 font-bold">
          Quiz Completed!
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" align="center">
          🎉 You got <strong>{correct}</strong> out of <strong>{total}</strong>{" "}
          questions right!
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          className="mt-2"
        >
          Score: {percentage}%
        </Typography>
      </DialogContent>

      <DialogActions>
        <Box sx={{ m: "0 auto", mb: 2 }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            sx={{ px: 4 }}
          >
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ResultModal;
