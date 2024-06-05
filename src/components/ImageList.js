import React, { useEffect, useState } from 'react';
import {
  fetchCatImages,
  fetchDogImages,
  fetchCatBreeds,
  fetchDogBreeds
} from '../api';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import LazyLoad from 'react-lazyload';
import '../index.css';

const ImageList = () => {
  // State hooks for images, breeds, loading status, and selected species/breed
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState('cat');
  const [selectedBreed, setSelectedBreed] = useState('');

  // Effect hook to fetch breeds based on selected species
  useEffect(() => {
    const getBreeds = async () => {
      if (selectedSpecies === 'cat') {
        const breedData = await fetchCatBreeds();
        setBreeds(breedData);
      } else {
        const breedData = await fetchDogBreeds();
        setBreeds(breedData);
      }
    };

    getBreeds();
  }, [selectedSpecies]);

  // Effect hook to fetch images based on selected breed and species
  useEffect(() => {
    const getImages = async () => {
      if (selectedSpecies === 'cat') {
        const data = await fetchCatImages(selectedBreed);
        setImages(data);
      } else {
        const data = await fetchDogImages(selectedBreed);
        setImages(data);
      }
      setLoading(false); // Set loading to false after fetching data
    };

    getImages();
  }, [selectedBreed, selectedSpecies]);

  // Event handler for species selection change
  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value); // Update selected species
    setSelectedBreed(''); // Reset selected breed
    setLoading(true); // Set loading to true for new species
  };

  // Event handler for breed selection change
  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value); // Update selected breed
    setLoading(true); // Set loading to true for new breed
  };

  return (
    <Container>
      {/* Species selection dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="species-select-label">Species</InputLabel>
        <Select
          labelId="species-select-label"
          value={selectedSpecies}
          onChange={handleSpeciesChange}
          label="Species"
        >
          <MenuItem value="cat">Cat</MenuItem>
          <MenuItem value="dog">Dog</MenuItem>
        </Select>
      </FormControl>

      {/* Breed selection dropdown */}
      <FormControl fullWidth margin="normal" disabled={!breeds.length}>
        <InputLabel id="breed-select-label">Breed</InputLabel>
        <Select
          labelId="breed-select-label"
          value={selectedBreed}
          onChange={handleBreedChange}
          label="Breed"
        >
          <MenuItem value="">
            <em>All Breeds</em>
          </MenuItem>
          {breeds.map((breed) => (
            <MenuItem key={breed.id} value={breed.id}>
              {breed.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Loading indicator or image grid */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
          {images.length > 0 ? (
            images.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                {/* Lazy load image */}
                <LazyLoad height={200} offset={100} once>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image.url}
                      alt="Animal Image"
                    />
                  </Card>
                </LazyLoad>
              </Grid>
            ))
          ) : (
            // Display message if no images available for selected breed
            <Typography variant="h6">No images available for this breed</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ImageList;
