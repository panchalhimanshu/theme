import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

const DeleteDialog = ({ callfor, isOpen, onClose, onDelete, delUrl }) => {
  const handleDelete = async () => {
    try {
      await callfor(delUrl, "POST", null, "Auth");
      onDelete(); // Call onDelete callback to handle success (e.g., refresh data)
      onClose(); // Close the dialog after successful deletion
    } catch (error) {
      console.error("Error deleting item", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete?</div>
          <DialogFooter>
            <Button onClick={handleDelete} color="destructive">
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;










// import DeleteDialog from "~/components/DeleteDialog";

// const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
// const [selectedUserId, setSelectedUserId] = useState(null);




// const handleDeleteUser = (userId) => {
//     setSelectedUserId(userId);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleCloseDeleteDialog = () => {
//     setIsDeleteDialogOpen(false);
//   };



//   onClick={() => handleDeleteUser(item.uid)

// <DeleteDialog
//             isOpen={isDeleteDialogOpen}
//             onClose={handleCloseDeleteDialog}
//             callfor={CallFor}
//             onDelete={() => {
//               fetchData(currentPage, searchFields);
//               setIsDeleteDialogOpen(false);
//             }}
//             delUrl={`v2/users/DeleteUser?uid=${selectedUserId}`}
//           />
