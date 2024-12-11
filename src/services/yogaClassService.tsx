import GLOBAL from '../utils/global';

export const fetchYogaClasses = async (schoolId: String) => {
  try {
    const response = await fetch(
      `${GLOBAL.LOCAL_API_URL}/yoga-classes/by-school/${schoolId}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch yoga classes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching yoga classes:', error);
    throw error;
  }
};

export const fetchYogaClass = async (classId: String) => {
  try {
    const response = await fetch(
      `${GLOBAL.LOCAL_API_URL}/yoga-classes/${classId}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch yoga class');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching yoga class:', error);
    throw error;
  }
};

export const joinToClass = async (classId: string, userId: string) => {
  try {
    const response = await fetch(
      `${GLOBAL.LOCAL_API_URL}/yoga-classes/${classId}/join`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to join yoga class');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error joining yoga class:', error);
    throw error;
  }
};

export const leaveClass = async (classId: string, userId: string) => {
  try {
    const response = await fetch(
      `${GLOBAL.LOCAL_API_URL}/yoga-classes/${classId}/leave`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to join yoga class');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error joining yoga class:', error);
    throw error;
  }
};
