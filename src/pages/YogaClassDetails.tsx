import React, { useEffect, useState } from 'react';
import { IonButton, IonSpinner } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { fetchYogaClass, joinToClass } from '../services/yogaClassService';
import Layout from '../components/Layout/Layout';
import { YogaClass } from './YogaClassList';
import { useAuth } from '../contexts/AuthContext';

const YogaClassDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [yogaClass, setYogaClass] = useState<YogaClass | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await fetchYogaClass(id);
        setYogaClass(data);
      } catch (error) {
        console.error('Error fetching class details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleJoinClass = async () => {
    try {
      if (user?.userId && yogaClass) {
        await joinToClass(yogaClass?._id, user.userId);
        alert('You have successfully joined the class!');
      }
    } catch (error) {
      alert('Error joining the class');
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

          <IonButton onClick={handleJoinClass}>Reservar</IonButton>
        </div>
      ) : (
        <p>Class not found</p>
      )}
    </Layout>
  );
};

export default YogaClassDetails;
