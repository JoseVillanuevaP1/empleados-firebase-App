import { Injectable, inject } from '@angular/core';
import {
  collection,
  addDoc,
  orderBy,
  getDoc,
  query,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  validator = false
  firestore: Firestore = inject(Firestore);

  constructor() {}

  agregarEmpleado(empleado: any): Promise<any> {
    const empleados = collection(this.firestore, '/empleados');
    return addDoc(empleados, empleado);
  }

  getEmpleados() {
    const empleados = collection(this.firestore, '/empleados');
    const collect = query(empleados, orderBy('nombre', 'asc'));
    return collect;
  }

  async eliminarEmpleado(id: string) {
    await deleteDoc(doc(this.firestore, '/empleados', id));
  }

  async getEmpleado(id: string) {
    const docRef = doc(this.firestore, '/empleados', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async actualizarEmpleado(id: string, data: any) {
    const dc = doc(this.firestore, '/empleados', id);
    await updateDoc(dc, data);
  }

}
