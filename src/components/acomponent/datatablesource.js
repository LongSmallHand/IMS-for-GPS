import { format } from 'date-fns';

export const userColumns = [
    { field: "id", headerName: "ID", width: 250 },
    {
      field: "displayName",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.displayName}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
  
    {
        field: "timeStamp",
        headerName: "Creation time",
        width: 200,
        renderCell: (params) => {
          const timestamp = params.row.timeStamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
          const formattedDateTime = format(timestamp, "yyyy-MM-dd HH:mm:ss"); // Format the date and time
    
          return <div>{formattedDateTime}</div>;
    }
},
    // {
    //   field: "timeStamp",
    //   headerName: "Creation time",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];
  