import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { fetchYogaClasses } from '../services/yogaClassService';
import GLOBAL from '../utils/global';
import Layout from '../components/Layout/Layout';
import './YogaClassList.css';

export interface YogaClass {
  _id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  type: string;
  level: number;
  teacher: string;
  school: string;
  capacity: number;
  registrations: [string];
}

const Booking: React.FC = () => {
  const [yogaClasses, setYogaClasses] = useState<YogaClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await fetchYogaClasses(GLOBAL.FAKE_SCHOOL_ID);
        setYogaClasses(classes);
      } catch (error) {
        console.error('Error fetching yoga classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleClassClick = (id: string) => {
    history.push(`/yoga-class-details/${id}`);
  };

  return (
    <Layout title='Yoga classes'>
      <>
        {loading ? (
          <IonSpinner />
        ) : (
          <IonList>
            {yogaClasses.map(yogaClass => (
              <IonItem
                key={yogaClass._id}
                button
                onClick={() => handleClassClick(yogaClass._id)}
                className='yoga-class-item'
              >
                <IonLabel>
                  <div className='yoga-class-header'>
                    <h2>{yogaClass.title}</h2>
                    <p>{yogaClass.type}</p>
                  </div>
                  <p>Date: {new Date(yogaClass.date).toLocaleString()}</p>
                  <p>Duration: {yogaClass.duration} minutes</p>
                  <p>Level: {yogaClass.level}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </>
    </Layout>
  );
};

export default Booking;
