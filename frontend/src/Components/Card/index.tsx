import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
interface PropsData {
  name: string;
  email: string;
  password: string;
  phone: number;
  zipcode: string;
  profilePic: string;
  lat: number;
  long: number;
  location?: {
    type: string;
    coordinates: [number];
  };
}

const index: React.FC<PropsData> = ({ profilePic, name, zipcode, phone }) => {
  return (
    <Card sx={{ maxWidth: 345,width:345 }}>
      <CardMedia sx={{ height: 140 }} image={profilePic} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zipcode {zipcode}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default index;
