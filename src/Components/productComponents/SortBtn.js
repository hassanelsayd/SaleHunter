import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ar = localStorage.getItem('ar')
export default function SortBtn(props) {
  const [arabic] = React.useState(data => ar? true: false)
  const handleChange = (event) => {
    props.setSortValue(event.target.value)
  };
  
  return (
    <div>
      <FormControl >
        <Select
          value={props.sortValue}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          className={`sort-btn ${arabic ?'ar':''}`}
        >
          
          <MenuItem className={arabic ?'ar':''} value={"popular"}> {arabic? "الأكثر شهره": "Popular"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"priceAsc"}>{arabic? "السعر تصاعدياً": "Price Ascending"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"priceDsc"}>{arabic? "السعر تنازلياً": "Price Descending"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"rating"}>{arabic? "التقييم": "Rating"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"nearest_store"}>{arabic? "اقرب متجر": "Nearest Store"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"best_deal"}>{arabic? "افضل صفقة": "Best Deal"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"newest"}>{arabic? "الأحدث": "Newest"}</MenuItem>
          <MenuItem className={arabic ?'ar':''} value={"oldest"}>{arabic? "الأقدم": "Oldest"}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
