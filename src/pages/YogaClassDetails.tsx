import React, { useEffect, useState } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { useParams } from 'react-router-dom';
import {
  fetchYogaClass,
  joinToClass,
  leaveClass,
} from '../services/yogaClassService';
import Layout from '../components/Layout/Layout';
import { YogaClass } from './YogaClassList';
import { useAuth } from '../contexts/AuthContext';

const YogaClassDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [yogaClass, setYogaClass] = useState<YogaClass | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const isItBooked = (registrations: string[]) => {
    if (user?.userId && yogaClass) {
      return registrations.includes(user.userId);
    }
    return false;
  };

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await fetchYogaClass(id);
        setYogaClass(data);

        if (data && data.registrations && user?.userId) {
          const bookIsBooked = isItBooked(data.registrations);
          setIsBooked(bookIsBooked);
        }
      } catch (error) {
        console.error('Error fetching class details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id, user?.userId]);

  const handleJoinClass = async () => {
    try {
      if (user?.userId && yogaClass) {
        await joinToClass(yogaClass?._id, user.userId);
        alert('Te esperamos en clase!');
        setIsBooked(true);
      }
    } catch (error) {
      alert('Error joining the class');
    }
  };

  const handleCancelClass = async () => {
    try {
      if (user?.userId && yogaClass) {
        await leaveClass(yogaClass?._id, user.userId);
        alert('Has cancelado tu reserva!');
        setIsBooked(false);
      }
    } catch (error) {
      alert('Error leaving the class');
    }
  };

  return (
    <Layout title={'Yoga class'} loading={loading}>
      {yogaClass ? (
        <div>
          <h1>{yogaClass.title}</h1>
          <p>
            <strong>Description:</strong> {yogaClass.description}
          </p>
          <p>
            <strong>Date:</strong> {new Date(yogaClass.date).toLocaleString()}
          </p>
          <p>
            <strong>Duration:</strong> {yogaClass.duration} minutes
          </p>
          <p>
            <strong>Type:</strong> {yogaClass.type}
          </p>
          <p>
            <strong>Level:</strong> {yogaClass.level}
          </p>
          <p>
            <strong>Teacher:</strong> {yogaClass.teacher}
          </p>
          <p>
            <strong>Capacity:</strong> {yogaClass.capacity}
          </p>
          <p>
            <strong>Registrations:</strong> {yogaClass.registrations.length}
          </p>

          {!isBooked && (
            <IonButton
              color='primary'
              size='large'
              expand='block'
              type='submit'
              onClick={handleJoinClass}
            >
              Reservar
            </IonButton>
          )}

          {isBooked && (
            <IonButton
              color='primary'
              size='large'
              expand='block'
              type='submit'
              onClick={handleCancelClass}
            >
              Cancel
            </IonButton>
          )}

          {isBooked && (
            <IonText color='primary'>
              <h2>Tienes reservada esta clase!</h2>
            </IonText>
          )}
        </div>
      ) : (
        <p>Class not found</p>
      )}
    </Layout>
  );
};

export default YogaClassDetails;
